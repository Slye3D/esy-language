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

const glob      = require('glob');
const esy       = require('../src');
const colors    = require('colors');
const path      = require('path');

const xmark     = '✗ ',
	checkmark   = '✓ ';

const TIMEOUT   = 3000;

esy.configs.load('../tmp/esy.json');
esy.configs.set('cache_dir', '../tmp/.cache');
esy.cache.load();

glob('*/*.js', {cwd: __dirname}, function (err, files) {
	if(files.length == 0)
		return console.error((xmark + "No test available!").red);
	var passed  = 0;
	var failed  = 0;
	var i       = 0;
	var test    = function(){
		if(i    == files.length)
			return;
		var file    = files[i];
		var called  = false;
		var timeout = setTimeout(function () {
			if(!called){
				callback(false);
			}
		}, TIMEOUT);
		var callback    = function(result){
			if(called)
				return;
			called  = true;
			clearTimeout(timeout);
			if(result){
				passed++;
				console.log(`${checkmark}Test #${i}<${file}> passed.`.cyan)
			}else {
				failed++;
				console.error(`${xmark}Test #${i}<${file}> failed.`.red)
			}
			i++;
			test();
		};
		try {
			require(path.join(__dirname, file))(callback);
		}catch (e){
			callback(false);
		}
	};
	test();
});
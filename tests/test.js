#!/usr/bin/env node
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
var _console    = Object.assign({}, console);
for(var name in console){
	if(console.hasOwnProperty(name) && typeof console[name] == 'function')
		console[name]   = function () {};
}
global.log = _console.log;
var queue   = [],
	i       = 0,
	names   = [],
	failed  = 0,
	passed  = 0,
	failed_n= [];
function test() {
	if(i == queue.length) {
		_console.log('_'.repeat(59).gray);
		var m;
		if(failed == 0){
			m = `${checkmark} All tests passed.`;
			_console.log(' '.repeat(Math.floor((59 - m.length) / 2)), m.green);
			process.exit();
		}else {
			m = `${xmark} Failed at ${failed} test${failed == 1 ? '' : 's'}:`;
			_console.log(m.red);
			var j = 0, l = failed_n.length.toString().length;
			_console.log(('    ' + failed_n.map(n => (j++, '0'.repeat(l - j.toString().length) + j + '- ' + n)).join('\n    ')).red);
			process.exit(1);
		}
		return;
	}
	var name    = names[i];
	var func    = queue[i];
	var called  = false;
	var timeout = setTimeout(function () {
		if(!called){
			assert(false, true);
		}
	}, TIMEOUT);
	var assert  = function(result, timeout = false){
		if(called)
			return;
		called  = true;
		clearTimeout(timeout);
		var s = '0'.repeat(queue.length.toString().length - (i+1).toString().length);
		var m = `Test #${s}${i + 1} <${name}> `;
		m += (' '.repeat(50 - m.length));
		if(result){
			passed++;
			_console.log(m + `${checkmark} passed`.cyan)
		}else {
			failed++;
			failed_n.push(name);
			_console.log(m + `${xmark} failed${timeout ? ' (timeout)' : ''}`.red)
		}
		i++;
		test();
	};
	func(assert, _console);
}
_console.log("Preparing tests...");
glob('*/*.js', {cwd: __dirname}, function (err, files) {
	var i = 0,
		tests, file, name;
	for(; i < files.length;i++){
		file    = files[i];
		try {
			tests   = require(path.join(__dirname, file));
			if(typeof tests == 'function'){
				names.push(file);
				queue.push(tests)
			}else {
				var keys = Object.keys(tests).filter(name => name.startsWith('$'));
				for(var j = 0; j < keys.length;j++) {
					name = keys[j];
					names.push(file.substr(0, file.lastIndexOf('.')) + ':' + name.substr(1));
					if(tests.hasOwnProperty(name))
						queue.push(tests[name])
				}
			}
		}catch (e){
			_console.error(`Failed to load <${file}>`, e)
		}
	}
	_console.log(`${queue.length} tests are in queue.`);
	test();
});
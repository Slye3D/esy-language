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
var queue   = [],
	i       = 0,
	names   = [],
	failed  = 0,
	passed  = 0;
function test() {
	if(i == queue.length) {
		_console.log('_____________________'.gray, `\nResult:`);
		if(failed == 0){
			_console.log(`${checkmark} All tests passed.`.green)
		}else {
			_console.log(`${xmark} ${failed} test${failed == 1 ? '' : 's'} failed.`.red)
		}
		return;
	}
	var name    = names[i];
	var func    = queue[i];
	var called  = false;
	var timeout = setTimeout(function () {
		if(!called){
			callback(false);
		}
	}, TIMEOUT);
	var assert  = function(result){
		if(called)
			return;
		called  = true;
		clearTimeout(timeout);
		if(result){
			passed++;
			_console.log(`${checkmark}Test #${i}<${name}> passed.`.cyan)
		}else {
			failed++;
			_console.error(`${xmark}Test #${i}<${name}> failed.`.red)
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
				tests   = tests.filter(name => name.startWith('$'));
				for(name in tests) {
					names.push(file + ':' + name);
					if(tests.hasOwnProperty(name))
						queue.push(tests[name])
				}
			}
		}catch (e){
			_console.error(`Failed to load <${file}>`)
		}
	}
	_console.log(`${queue.length} tests are in queue.`);
	test();
});
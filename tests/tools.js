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

const vm    = require('vm');

/**
 * Compile a esy code
 * @param code
 */
function compile(code) {
	var esy     = require('../src/index');
	esy.configs.load();
	esy.configs.run('cache.active', false);
	var tree    = esy.tree(code);
	return esy.compile(tree);
}

/**
 * Evaluate a js code
 * returns error.toString on errors
 * @param code
 * @return {*}
 */
function safeEval(code) {
	var re;
	try {
		re = eval(code);
	}catch (e){
		re = e.toString();
	}
	return re;
}

/**
 * Run code in javascript VM
 * @param JsCode
 * @param time
 */
function run(JsCode, time = 0){
	return new Promise((resolve, reject) => {
		var names   = [],
			name;
		for(name in global){
			names.push(name)
		}

		var sandbox = {};
		for(name of names){
			if(name == 'global')
				sandbox[name]   = sandbox;
			else if(name !== 'log'){
				if (typeof global[name] == 'object')
					sandbox[name] = Object.assign({}, global[name]);
				else
					sandbox[name] = global[name]
			}
		}
		// Make stdout & stderr
		sandbox.stdout  = '';
		sandbox.stderr  = '';

		var console_keys    = [
			'log'   , 'info',
			'warn'  , 'dir',
			'time'  , 'trace'
		];
		console_keys.forEach(key => {
			sandbox.console[key]    = function () {
				for(var t of arguments){
					sandbox.stdout += t + ' ';
				}
				sandbox.stdout += '\n';
			}
		});
		sandbox.console.error   = function(){
			for(var t of arguments){
				sandbox.stderr += t + ' ';
			}
			sandbox.stderr += '\n';
		};

		var re  = () => {
			for(name in sandbox){
				if(names.indexOf(name) > -1 && ['i', 're'].indexOf(name) == -1){
					delete sandbox[name]
				}
				if(name.startsWith('_tmp') || name.startsWith('__')){
					delete sandbox[name]
				}
			}
			resolve(sandbox)
		};

		try {
			const script   = new vm.Script(JsCode);
			script.runInNewContext(sandbox);
			setTimeout(function () {
				re()
			}, time)
		}catch (e){
			reject(e);
		}
	})
}

/**
 * Compare result of Esy code and JS version
 * @param EsyCode
 * @param js
 * @param pendingTime
 * @return {Promise}
 */
function compare(EsyCode, js, pendingTime = 0){
	js      = js || EsyCode;
	EsyCode = compile(EsyCode);
	var debug   = false,
		json    = false;
	var re = new Promise((resolve, reject) => {
		var sandbox1 = {}, sandbox2 = {},
			pending = 2;
		run(EsyCode, pendingTime).then(re => {
			sandbox1 = re;
			pending--;
			if(pending == 0) {
				if(debug) {
					if (!json)
						log(sandbox1, ',', sandbox2);
					else
						log(JSON.stringify(sandbox1), ',', JSON.stringify(sandbox2));
				}
				resolve(JSON.stringify(sandbox1) == JSON.stringify(sandbox2))
			}
		}, err => {
			reject(err)
		});

		run(js, pendingTime).then(re => {
			sandbox2 = re;
			pending--;
			if(pending == 0) {
				if(debug) {
					if (!json)
						log(sandbox1, ',', sandbox2);
					else
						log(JSON.stringify(sandbox1), ',', JSON.stringify(sandbox2));
				}				resolve(JSON.stringify(sandbox1) == JSON.stringify(sandbox2))
			}		}, err => {
			reject(err);
		});
	});
	re.debug = function (out_json = false) {
		debug = true;
		ison = out_json;
		return re;
	};
	return re;
}

module.exports.compile  = compile;
module.exports.safeEval = safeEval;
module.exports.compare  = compare;
module.exports.run      = run;
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

const {compare} = require('../tools');

var codes   = [
	// test 1
	[
		// esy
		`ages = {ali:5, john:20, 'qti3e': 16}
		foreach(ages as name:age)
			console.log(name, ' is ', age, ' years old');`,
		// js
		`ages = {
    ali: 5,
    john: 20,
    'qti3e': 16
};
var _tmpFEO789 = ages;
var _tmpFE789 = function(age, name) {
    console.log(name, ' is ', age, ' years old')
};
if (_tmpFEO789.forEach) {
    _tmpFEO789.forEach(_tmpFE789);
} else {
    for (var __key789 in _tmpFEO789) {
        _tmpFE789(_tmpFEO789[__key789], __key789)
    }
}
`
	],

	// test 2
	[`a = [5,7]
	foreach(a as k:v){
		console.log(k,v)
	}`,

		`a = [5, 7];
var _tmpFEO789 = a;
var _tmpFE789 = function(v, k) {
    console.log(k, v)
};
if (_tmpFEO789.forEach) {
    _tmpFEO789.forEach(_tmpFE789);
} else {
    for (var __key789 in _tmpFEO789) {
        _tmpFE789(_tmpFEO789[__key789], __key789)
    }
}`
	],

	// test 3
	[`a = [5,7,8]
	foreach(a as v){
		console.log(v * 5)
	}`,
	`a = [5, 7, 8];
var _tmpFEO789 = a;
var _tmpFE789 = function(v) {
    console.log(v * 5)
};
if (_tmpFEO789.forEach) {
    _tmpFEO789.forEach(_tmpFE789);
} else {
    for (var __key789 in _tmpFEO789) {
        _tmpFE789(_tmpFEO789[__key789], __key789)
    }
}`
	]
];

for(let i in codes){
	let code = codes[i];
	let esy = code;
	let js  = code;
	if(typeof code != 'string'){
		esy = code[0];
		js = code[1]
	}
	exports['$test' + (parseInt(i) + 1)]  = function(assert){
		compare(esy, js).then(re => {
			assert(re)
		}, () => {
			assert(false);
		})
	};
}
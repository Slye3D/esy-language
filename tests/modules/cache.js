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

const {compare}   = require('../tools');

exports.$complete   = function (assert) {
	var esy_code    = `// Cache sum for 500ms
cache 100 sum(a,b){
	console.log('Computing...');
	return a+b;
} key (c,d){
	// We don't care about numbers order in sum function (a+b=b+a)
	return [c, d].sort();
}

// Compute 5+7 once
console.log(sum(5,7))

// Load theme from cache without computing
console.log(sum(5,7))
console.log(sum(7,5))

// Wait 100ms more than cache's lifetime.
timeout 200{
	// It should compute 5+7 again
	console.log(sum(7,5))
}
`;
	var js_code = `var __esy_cache = __esy_cache || {};
/* Cache sum for 500ms*/
function sum(a, b) {
    var key = "sum-" + JSON.stringify((function(c, d) {
        /* We don't care about numbers order in sum function (a+b=b+a)*/
        return [c, d].sort()
    })(...arguments));
    if (__esy_cache[key])
        return __esy_cache[key];
    var re = (function(a, b) {
        console.log('Computing...');
        return a + b
    })(...arguments);
    __esy_cache[key] = re;

    setTimeout(function() {
        delete __esy_cache[key];
    }, parseInt(100));
    return re;
} /* Compute 5+7 once*/
console.log(sum(5, 7));
/* Load theme from cache without computing*/
console.log(sum(5, 7));
console.log(sum(7, 5));
/* Wait 100ms more than cache's lifetime.*/
setTimeout(function() { /* It should compute 5+7 again*/
    console.log(sum(7, 5))
}, 200);`;

	compare(esy_code, js_code, 250).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$test2  = function (assert) {
	var esy_code    = `
	function s(){
		return 100;
	}
cache s() sum(a,b){
	console.log('Computing...');
	return a+b;
} key (c,d){
	// We don't care about numbers order in sum function (a+b=b+a)
	return [c, d].sort();
}

// Compute 5+7 once
console.log(sum(5,7))

// Load theme from cache without computing
console.log(sum(5,7))
console.log(sum(7,5))

// Wait 100ms more than cache's lifetime.
timeout 200{
	// It should compute 5+7 again
	console.log(sum(7,5))
}
`;
	var js_code = `var __esy_cache = __esy_cache || {};
/* Cache sum for 500ms*/
function sum(a, b) {
    var key = "sum-" + JSON.stringify((function(c, d) {
        /* We don't care about numbers order in sum function (a+b=b+a)*/
        return [c, d].sort()
    })(...arguments));
    if (__esy_cache[key])
        return __esy_cache[key];
    var re = (function(a, b) {
        console.log('Computing...');
        return a + b
    })(...arguments);
    __esy_cache[key] = re;

    setTimeout(function() {
        delete __esy_cache[key];
    }, parseInt(100));
    return re;
} /* Compute 5+7 once*/
console.log(sum(5, 7));
/* Load theme from cache without computing*/
console.log(sum(5, 7));
console.log(sum(7, 5));
/* Wait 100ms more than cache's lifetime.*/
setTimeout(function() { /* It should compute 5+7 again*/
    console.log(sum(7, 5))
}, 200);`;

	compare(esy_code, js_code, 250).then(re => {
		assert(false)
	}, () =>  {
		assert(true);
	});
};
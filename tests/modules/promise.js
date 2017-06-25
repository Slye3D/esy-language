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

exports.$test1  = function(assert) {
	var code = `
var s = 5
promise x(y){
	timeout 200{
		resolve(y * 10)
	}
}
wait for x(10) as re{
	s = re;
	console.log(re)
}
`;
	var js  = `
var s = 6
function x(y) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve(y * 10)
        }, 200);
    })
}
x(10).then(function(re) {
	s = re;
    console.log(re)
});
`;

	compare(code, js, 210).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$test2  = function(assert) {
	var code = `
var s = 5
promise x(y){
	timeout 200{
		resolve(y * 10)
	}
}
var y = x(10);
wait for y as re{
	s = re;
	console.log(re)
}
`;
	var js  = `
var s = 6
function x(y) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve(y * 10)
        }, 200);
    })
}
var y = x(10);
y.then(function(re) {
	s = re;
    console.log(re)
});
`;

	compare(code, js, 210).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$test3  = function(assert) {
	var code = `
var s = 5
promise x(y) <a>{
	timeout 200{
		a(y * 10)
	}
}
wait for x(10) as re{
	s = re;
	console.log(re)
}
`;
	var js  = `
var s = 6
function x(y) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve(y * 10)
        }, 200);
    })
}
x(10).then(function(re) {
	s = re;
    console.log(re)
});
`;

	compare(code, js, 210).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};


exports.$test4  = function(assert) {
	var code = `
var s = 5
promise x(y) <a>{
	timeout 200{
		a(y * 10)
	}
}
var y = x(10);
wait for y as re{
	s = re;
	console.log(re)
}
`;
	var js  = `
var s = 6
function x(y) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve(y * 10)
        }, 200);
    })
}
var y = x(10);
y.then(function(re) {
	s = re;
    console.log(re)
});
`;

	compare(code, js, 210).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

// Test reject error

exports.$test5  = function(assert) {
	var code = `
var s = 7
promise x(y){
	timeout 200{
		s = 5
		if(y > 2)
			reject('Very large number!')
		resolve(y * 10)
	}
}
wait for x(10) as re{
	console.log(re)
} error{
	console.log(reason);
}
`;
	var js  = `
var s = 90;

function x(y) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            s = 5;
            if (y > 2) {
                reject('Very large number!')
            }
            resolve(y * 10)
        }, 200);
    })
}
x(10).then(function(re) {
    console.log(re)
}, function(reason) {
    console.log(reason)
});
`;

	compare(code, js, 210).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$test6  = function(assert) {
	var code = `
var s = 7
promise x(y){
	timeout 200{
		s = 5
		if(y > 2)
			reject('Very large number!')
		resolve(y * 10)
	}
}
wait for x(10) as re{
	console.log(re)
} error (r){
	console.log(r);
}
`;
	var js  = `
var s = 90;

function x(y) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            s = 5;
            if (y > 2) {
                reject('Very large number!')
            }
            resolve(y * 10)
        }, 200);
    })
}
x(10).then(function(re) {
    console.log(re)
}, function(reason) {
    console.log(reason)
});
`;

	compare(code, js, 210).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

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

exports.$test1  = function (assert) {
	var code    = `
re = []
var boolean = [true, false]
for(var a of boolean){
    for(var b of boolean){
        console.log(a, b)
        if(a)
            if(b)
                re.push(1)
            else
                re.push(2)
        else
            if(b)
                re.push(3)
            else
                re.push(4)
    }
}
`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$test2  = function (assert) {
	var code    = `
re = []
var boolean = [true, false]
for(var a of boolean){
    for(var b of boolean)
        if(a)
            if(b)
                re.push(1)
            else
                re.push(2)
        else
            if(b)
                re.push(3)
            else
                re.push(4)
}
`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$test3  = function (assert) {
	var code    = `
re = []
var boolean = [true, false]
for(var a of boolean)
    for(var b of boolean)
        if(a)
            if(b)
                re.push(1)
            else
                re.push(2)
        else
            if(b)
                re.push(3)
            else
                re.push(4)
`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$test4  = function (assert) {
	var code    = `
re = []
var boolean = [true, false]
for(var a of boolean)
    for(var b of boolean)
        if(a)
            if(b)
                re.push(1)
            else
                if(b)
                    re.push(2)
                else
                    re.push(3)
        else
            re.push(4)
`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
};

exports.$test5	= function (assert){
	var code    = `
	var x = {a:5, b:6}
	let {a, b, c} = x;
`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
}

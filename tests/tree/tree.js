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

exports.$test6	= function (assert){
	var code    = `
	var x = Math.abs((1 - 9) * 100),
		y = 6,
		z = 8;
	let {a, b, c} = x;
`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
}

exports.$test7	= function (assert){
	var code    = `
	let x = [true, false];
	for(var a = 0;a <= 1;a++){
		for(var b = 0;b <= 1;b++){
			for(var c = 0;c <= 1;c++){
				if(a) console.log(1)
				else if (b) console.log(2)
				else if (c) console.log(3)
				else console.log(4)
			}
		}
	}
`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
}

exports.$test8	= function (assert){
	var code    = `
	let r = new RegExp(/^\\w{3,}$/)
	let b = r.test('aaaa')
	console.log(b);
`;

	compare(code).then(re => {
		assert(re)
	}, () =>  {
		assert(false);
	});
}

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
const regex    = require('../../src/libs/tree/regex')

var patterns = [
	// test 1
	[/^sa/ig, ['sa', 'fd', 'fdsa', 'sad']],
    // test 2
    [/^\w{3,}$/ig, ['sas', 'sasad', '-sasa', 'sa', '4', 't']],
    // test 3
    [/\//ig, ['x', '/']],
    // test 4
    [/hh\/+$/ig, ['sx', '/']],
    // test 5
    [/sasas\/sasaw/ig, ['sx', '/']]
]
for(let i in patterns){
	let pattern    = patterns[i][0].toString(),
        testCases  = JSON.stringify(patterns[i][1]);
    let code    = `var re = [],
    strings = JSON.parse('${testCases}');
    for(let i = 0; i < strings.length;i++){
        let r = ${pattern};
        re.push(r.test(strings[i]))
    }
    `
	exports['$test' + (parseInt(i) + 1)]  = function(assert, console){
		compare(code).then(re => {
            global.regexes = []
            let f = regex.encode(pattern);
			assert(re && f == '\\r{0}')
		}, () => {
			assert(false);
		})
	};
}

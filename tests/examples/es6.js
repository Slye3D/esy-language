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
	'const PI = 3.141593',

	// test 2
	`re = []
	function foo () { return 1 }
    re.push(foo() === 1)
    {
        function foo () { return 2 }
        re.push(foo() === 2)
    }
    re.push(foo() === 1)`,

	// test 3
	`evens = [2,4,6,8,10,12,14,20]
	odds  = evens.map(v => v + 1)
	pairs = evens.map(v => ({ even: v, odd: v + 1 }))
	nums  = evens.map((v, i) => v + i)`,

	// test 4
	`nums = [13,35,53,56,90,20,25,32+3]
	fives = []
	nums.forEach(v => {
        if (v % 5 === 0)
            fives.push(v)
	})`,

	// test 5
	`function f (x, y = 7, z = 42) {
        return x + y + z
	}
	re = f(1) === 50`,

	// test 6
	`function f (x, y, ...a) {
        return (x + y) * a.length
	}
	re = f(1, 2, "hello", true, 7) === 9`,

	// test 7
	`var params = [ "hello", true, 7 ]
	var other = [ 1, 2, ...params ] // [ 1, 2, "hello", true, 7 ]

	function f (x, y, ...a) {
        return (x + y) * a.length
	}
	var re = f(1, 2, ...params) === 9

	var str = "foo"
	var chars = [ ...str ] // [ "f", "o", "o" ]`,

	// test 8
	`var customer = { name: "Foo" }
	var card = { amount: 7, product: "Bar", unitprice: 42 }
	var message = \`Hello \${customer.name},
	want to buy \${card.amount} \${card.product} for
	a total of \${card.amount * card.unitprice} bucks?\``,

	// test 9
	`0b111110111 === 503
	0o767 === 503`,

	// test 10
	`"𠮷".length === 2
	"𠮷".match(/./u)[0].length === 2
	a = "𠮷" === "\uD842\uDFB7"
	b = "𠮷" === "\u{20BB7}"
	c = "𠮷".codePointAt(0) == 0x20BB7
	for (let codepoint of "𠮷") console.log(codepoint)`,

	// test 11
	`x = 5, y = 8
	obj = { x, y }`,

	// test 12
	`function quux(){return 10};
	let obj = {
        foo: "bar",
        [ "baz" + quux() ]: 42
	}`,

	// test 13
	`var list = [ 1, 2, 3 ]
	var [ a, , b ] = list
	[ b, a ] = [ a, b ]`,

	// test 14
	`function getASTNode(){
		return {
			op: 5,
			lhs: {
				op: 8
			},
			rhs: 7
		}
	}
	var { op, lhs, rhs } = getASTNode()`,

	// test 15
	`function getASTNode(){
		return {
			op: 5,
			lhs: {
				op: 8
			},
			rhs: 7
		}
	}
	var { op: a, lhs: { op: b }, rhs: c } = getASTNode()`,
];

for(let i in codes){
	let code = codes[i];
	exports['$test' + (parseInt(i) + 1)]  = function(assert){
		compare(code).then(re => {
			assert(re)
		}, () => {
			assert(false);
		})
	};
}
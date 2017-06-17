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

const comments  = require('../../src/libs/refactor/comments');
module.exports  = function (test) {
	var code    = `
/**
* js is good
* "
*/
console.log('b');
// "sa"
console.log("a")
/**
* "
* * /
* "Comment in quotation"
*/
<!-- Html comment -->
<!-- Multi line comment 
	Line two
	-->
`;
	var re  = comments(code).trim().replace(/\s\s+/g, ' ');
	test(re == `console.log('b'); console.log("a")`)
};
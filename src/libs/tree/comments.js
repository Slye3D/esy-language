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
global.comments = global.comments || [];

function encode(code) {
	var regex   = /\/\*[\s\S]*?\*\/|\/\/[^\u000A\u000D\u2028\u2029]*|<!--[\s\S]*?-->/g;
	code    = code.replace(regex, function (comment) {
		var i = global.comments.length;
		global.comments[i] = comment;
		return `\\c{${i.toString(36)}}`;
	});
	return code;
}

module.exports = {
	encode: encode,
	get: i => global.comments[i]
};
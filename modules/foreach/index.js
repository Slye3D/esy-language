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

function foreach(esy){
	var {compile} = esy;
	esy.block(/^foreach\s*\((.+)\s*as\s+(?:([$A-Z_][$A-Z_0-9]*)\s*:)?\s*([$A-Z_][$A-Z_0-9]*)\)\s*$/ig, (matches, block) => {
		var obj     = matches[1];
		var key     = matches[2] ? ',' + matches[2] : '';
		var value   = matches[3];
		var body    = compile(block.body);
		var random  = Math.floor(Math.random() * 1000);
		return `
var feO${random}    = ${obj};
var fe${random} = function (${value}${key}) {
	${body}
};
if(feO${random}.forEach){
	feO${random}.forEach(fe${random});
}else{
	for(var __key${random} in feO${random}){
		fe${random}(feO${random}[__key${random}], __key${random})
	}
}`
	});

	return {
		name: "Esy Foreach",
		version: "0.0.1",
		author: "Slye Development Team"
	};
}
module.exports  = foreach;
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
var _tmpFEO${random}    = ${obj};
var _tmpFE${random} = function (${value}${key}) {
	${body}
};
if(_tmpFEO${random}.forEach){
	_tmpFEO${random}.forEach(_tmpFE${random});
}else{
	for(var __key${random} in _tmpFEO${random}){
		_tmpFE${random}(_tmpFEO${random}[__key${random}], __key${random})
	}
}`
	});

	return {
		name: "Esy Foreach",
		version: "0.0.2",
		author: "Slye Development Team"
	};
}
module.exports  = foreach;
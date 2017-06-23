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

/**
 * Convert the following pattern to a more readable format for other steps
 *  var square = n => n^2;
 *  It becomes:
 *  var square = n => {return n^2};
 * @param code
 */
function func(code){
	return code.replace(/=>(?!\s*\{)\s*([\s\S]+?);/ig,'=>{return $1;}');
}
module.exports = func;
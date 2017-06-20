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

// List of all line terminators
var EOLs    = [
	'\u000A',   // LINE FEED            <LF>
	'\u000D',   // CARRIAGE RETURN      <CR>
	'\u2028',   // LINE SEPARATOR       <LS>
	'\u2029'    // PARAGRAPH SEPARATION <PS>
];


/**
 * Return whatever a character is a line terminator or not
 * @param character
 * @return {boolean}
 */
function IsEOL(character){
	return EOLs.indexOf(character) > -1
}

IsEOL.regex = '('+EOLs.join('|')+')';
IsEOL.chars = EOLs;
module.exports  = IsEOL;
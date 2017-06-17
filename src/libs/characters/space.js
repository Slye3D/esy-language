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
 * Check if a character is blank space
 *  http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf (11.2)
 * @param letter
 */
module.exports = letter => [
	'\u0009',   // CHARACTER TABULATION
	'\u000b',   // LINE TABULATION
	'\u000c',   // FORM FEED (FF)
	'\u0020',   // SPACE
	'\u00A0',   // NO-BREAK SPACE
	'\uFEFF',   // ZERO WIDTH NO-BREAK SPACE
	// Zs: category
	'\u0020',   // SPACE
	'\u00A0',   // NO-BREAK SPACE
	'\u1680',   // OGHAM SPACE MARK
	'\u2000',   // EN QUAD
	'\u2001',   // EM QUAD
	'\u2002',   // EN SPACE
	'\u2003',   // EM SPACE
	'\u2004',   // THREE-PER-EM SPACE
	'\u2005',   // FOUR-PER-EM SPACE
	'\u2006',   // SIX-PER-EM SPACE
	'\u2007',   // FIGURE SPACE
	'\u2008',   // PUNCTUATION SPACE
	'\u2009',   // THIN SPACE
	'\u200A',   // HAIR SPACE
	'\u202F',   // NARROW NO-BREAK SPACE
	'\u205F',   // NARROW NO-BREAK SPACE
	'\u3000',   // IDEOGRAPHIC SPACE
].indexOf(letter) > -1;
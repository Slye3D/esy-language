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

global.quotations   = global.quotations || [];

// Define replaceBetween function to replace a substring between two indices
String.prototype.replaceBetween = function(start, end, what) {
	return this.substring(0, start) + what + this.substring(end);
};

function encode(code){
	const quotation_signs   = ['"', "'", '`'];
	var quotations  = [];
	var in_q    = false;
	var l_q     = ''; // Either one of " or '
	var bs      = false; // Check for backspace
	var start   = 0; // Start offset
	var comment = '';
	var open_comments   = 0;
	var close_comments  = 0;
	var olc             = false;    //olc: One Line Comment (//foo)
	for(var offset = 0; offset < code.length; offset++){
		var l = code[offset];
		if(in_q){
			if(!bs) {
				if (l == l_q) {
					in_q = false;
					quotations.push([start, offset]);
					continue;
				}
				if(l == '\\'){
					bs  = true;
				}
			}else {
				bs = false;
			}
		}else {
			comment = (l == '/' && code[offset + 1] && code[offset + 1] == '*') && !olc;
			if(l == '/' && code[offset + 1] && code[offset + 1] == '/'){
				comment = true;
				olc = true;
				open_comments++;
			}
			if(comment)
				open_comments++;


			if(open_comments !== close_comments){
				if(!olc && l == '/' && code[offset - 1] && code[offset - 1] == '*') {
					close_comments++;
				}
				if(olc && (l == '\n' || l == '\r')){
					close_comments++;
					olc = false;
				}
			}

			if(open_comments == close_comments && quotation_signs.indexOf(l) > -1) {
				// It's start of a quotation
				start = offset;
				l_q = l;
				in_q = true;
			}
		}
	}
	var f   = 0;
	for(var indices of quotations){
		var s   = indices[0],
			e   = indices[1],
			i   = global.quotations.length,
			c   = `\\q{${i.toString(36)}}`;
		global.quotations[i]    = code.substring(s - f, e + 1 - f);
		code = code.replaceBetween(s - f, e + 1 - f, c);
		f   += ((e + 1) - s) - c.length;
	}
	return code;
}

module.exports = {
	encode: encode,
	get: i => global.quotations[i]
};
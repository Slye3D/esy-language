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

 global.regexes = global.regexes || [];

 function encode(code) {
 	var regex   = /\/(?:[^\s*\/\[]|\\\S|\[(?:(?:(?:[^\s\]\\]|\\\S)+)+)?\])(?:(?:[^\s\/\[]|\\\S|\[(?:(?:(?:[^\s\]\\]|\\\S)+)+)?\])+)?[^\\]\/(?:gmui|umgi|igum|umig|imgu|imug|iugm|iumg|ugmi|gimu|gium|gmiu|igmu|ugim|guim|gumi|migu|miug|uimg|mgiu|mgui|muig|mugi|uigm|img|ium|gui|umg|gum|imu|igm|ugi|mig|gim|miu|igu|giu|mgi|umi|mgu|ugm|uim|mui|gmi|mug|iug|gmu|uig|gm|ui|mg|ug|mi|gu|mu|gi|um|iu|im|ig|u|g|i|m|)/ig;
 	code    = code.replace(regex, function (regex) {
 		var i = global.regexes.length;
 		global.regexes[i] = regex;
 		return `\\r{${i.toString(36)}}`;
 	});
 	return code;
 }

 module.exports = {
 	encode: encode,
 	get: i => global.regexes[i]
 };

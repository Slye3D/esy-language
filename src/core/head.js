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

// Save all headers as an object (key is header's UUID and value is JS code)
global.header   = global.header || {};

/**
 * Get file header
 * @return {string}
 */
exports.get = function(){
	var re  = [];
	// Convert object to array
	for(var o of global.header){
		re.push(o)
	}
	// Sort it by second element (portion)
	re.sort((a,b) => b[1] - a[1]);
	//Convert it to string
	re  = re.join('\n');

	return re;
};

/**
 *
 * @param uuid
 * @param code
 * @param position
 */
exports.add = function(uuid, code, position = 1){
	global.header[uuid] = [code, position];
};
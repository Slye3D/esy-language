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
 * convert the following pattern:
 *  return [head]{...};
 *  to:
 *  return([head]{...});
 * @param map
 */
function return_parenthesis(map) {
	var offset;
	var re = [];
	for(offset = 0;offset < map.length;offset++){
		if(typeof map[offset] == 'object'){
			if(map[offset].head.substr(0,7) == 'return '){
				re.push('return(');
				re.push({
					head: map[offset].head.substr(7),
					body: return_parenthesis(map[offset].body)
				});
				re.push(')')
			}else {
				re.push({
					head: map[offset].head,
					body: return_parenthesis(map[offset].body)
				})
			}
		}else {
			re.push(map[offset])
		}
	}
	return re;
}
module.exports = return_parenthesis;
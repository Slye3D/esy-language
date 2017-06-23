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

function one_line_blocks(tree){
	const keys  =   ['if', 'else', 'for'];
	const len   = keys.length;
	var offset, k;
	for(offset = tree.length - 1;offset >= 0;offset--){
		if(typeof tree[offset] == 'string'){
			for(k = 0;k < len;k++){
				if(keys[k] == tree[offset].substr(0, keys[k].length)){
					tree[offset] = {
						head: tree[offset],
						body: [tree[offset+1]]
					};
					tree.splice(offset+1, 1);
					break;
				}
			}
		}else {
			// It's object
			if(tree[offset].body.length > 0){
				tree[offset].body   = one_line_blocks(tree[offset].body);
			}
		}
	}
	return tree;
}
module.exports  = one_line_blocks;
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

function k2b(tree){
	var keywords    = global.blockKeys;
	tree    = tree.map(row => {
		if(typeof row == 'object')
			return {
				head: row.head,
				body: k2b(row.body)
			};
		if(typeof row == 'string'){
			for(var keyword in keywords){
				if(row.toLowerCase().startsWith(keyword)){
					if(['<', ' ', '('].indexOf(row[keyword.length]) > -1){
						var p = new RegExp(keywords[keyword]);
						if(p.test(row)){
							return {
								head: row,
								body: []
							}
						}
					}
				}
			}
		}
		return row;
	});
	return tree;
}
module.exports  = k2b;
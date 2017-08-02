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

const {get} = require('../../core/keywords')

/**
 * convert this pattern:
 * ['let', '{...}']
 * to: ['let {...}']
 */
function keywords(tree){
    let offset = 0;
    for(;offset < tree.length;offset++){
        if(typeof tree[offset] == 'string'){
            if(get(tree[offset].trim()) && typeof tree[offset + 1] == 'string'){
                tree[offset] += ' ' + tree[offset + 1]
                tree[offset + 1] = undefined;
            }
        }else if(typeof tree[offset] == 'object'){
            tree[offset]['body']    = keywords(tree[offset]['body']);
        }
    }
    tree = tree.filter(a => a !== undefined)
    return tree;
}
module.exports = keywords;

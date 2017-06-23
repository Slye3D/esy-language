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
 * Support for interval and timeout property
 * @param esy
 */
function timer(esy){
	esy.block(/^(interval|timeout)(?:\s+(?=\d+)(\d+))?(?:\s*<(.*)>)?(?:\s*\(([\w\s,]*)\))?$/ig, (matches, block) => {
		var func        = matches[1].toLowerCase() == 'timeout' ? 'setTimeout' : 'setInterval';
		var callback    = esy.compile(block.body);
		var delay       = matches[2] || 0;
		var pass_args   = matches[3];
		var func_args   = matches[4];
		var re  = func + '(function(';
		if(func_args)
			re  += func_args;
		re += '){' + callback + '}, ' + delay;
		if(pass_args)
			re += ',' + pass_args;
		re += ');';
		return re;
	});
	return {
		name    : "Esy Timer",
		version : "0.0.1",
		author  : "Slye Development Team"
	};
}
module.exports  = timer;
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
	var {regex} = esy;
	var pattern = (new regex(
		regex.beginning(),

		regex.text('timeout', 'interval').capture('type'),

		regex.rightHand().capture('time'),

		regex.group(
			regex.text('<'),
			regex.callParameters().capture('parameters'),
			regex.text('>')
		).optional(),

		regex.group(
			regex.text('('),
			regex.arguments().capture('arguments'),
			regex.text(')')
		).optional(),

		regex.end()
	)).autoSpace();

	esy.block(pattern.toObj(), (matches, block) => {
		var func        = matches[1].toLowerCase() == 'timeout' ? 'setTimeout' : 'setInterval';
		var callback    = esy.compile(block.body);
		var delay       = matches[2] || 0;
		if(delay.endsWith(';'))
			delay = delay.substr(0, delay.length - 1);
		var pass_args   = matches[3];
		var func_args   = matches[4];
		console.log(matches)
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
		version : "0.0.2",
		author  : "Slye Development Team"
	};
}
module.exports  = timer;
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
 * Events
 * @param esy
 */
function events(esy) {
	const {regex, block, compile} = esy;
	var pattern = new regex(
		regex.beginning(),

		regex.text('#'),
		regex.identifier().capture(),

		regex.group(
			regex.text('<'),
			regex.callParameters().capture(),
			regex.text('>')
		).optional(),

		regex.text('('),
		regex.arguments().optional().capture(),
		regex.text(')'),

		regex.group(
			regex.text('.'),
			regex.identifier().capture()
		).optional(),

		regex.end()
	).autoSpace().toObj();

	esy.block(pattern, (matches, block) => {
		let variable    = matches[1],
			event       = matches[2] || '',
			args        = matches[3] ? ',' +matches[3] : '',
			evFunc      = matches[4] ? '.' + matches[4] : '.on',
			body        = compile(block.body);

		return `${variable}${evFunc}(${event}${args}){
			${body}
		}`
	});

	return {
		name: "Esy Events",
		version: "0.0.1",
		author: "Slye Development Team"
	};
}
module.exports = events;